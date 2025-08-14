import { useCallback, useEffect, useState } from "react";
import { groups } from "./data";
import { Group } from "./Group";
import { Practice } from "./Practice";
import { shuffle, useGlobalKeyDown } from "./tools";
import { DataContext } from "./DataContext";
import { Languages } from "./Languages";

const logo = new URL('./assets/img.svg', import.meta.url);
function getWordsArray(group) {
  return group.words.split('\n');
}
function getRandomWordsFromGroup(group){

  return shuffle(getWordsArray(group)).slice(0, 5);
}
function getQueueWordsFromGroup(group, lastIndex = 0){

  let res = getWordsArray(group).slice(lastIndex, lastIndex + 5);
  if (res.length < 5) {
    res = res.concat(getWordsArray(group).slice(0, 5 - res.length));
  }
  return res;
}

export function App() {
  const [activeGroup, setActiveGroup] = useState();
  const [lhsVisible, setLHSVisible] = useState(false);
  const [rhsVisible, setRHSVisible] = useState(false);
  const [lastGroup, setLastGroup] = useState();
  const [lastIndex, setLastIndex] = useState(0);
  const [activePractice, setActivePractice] = useState();
  const [language, setLanguage] = useState(window.location.hash.replace('#', ''));
  
  const orders = [
    {
      id: 'order1',
      label: 'Random'
    },
    {
      id: 'order2',
      label: 'Queue'
    }
  ];
  const practiceTypes = [
    {
      id: 'practice1',
      label: 'Study + Test'
    },
    {
      id: 'practice2',
      label: 'Test only'
    }
  ];
  const modes = [
  {
    id:'mode1',
    label: 'Hanzi ->> pinyin'
  },
  {
    id:'mode2',
    label: 'Pinyin -> hanzi'
  },
  {
    id:'mode3',
    label: 'Hanzi understanding'
  },
  {
    id:'mode4',
    label: 'Pinyin understanding'
  },
  {
    id:'mode5',
    label: 'Translate to hanzi'
  },
  {
    id:'mode6',
    label: 'Translate to pinyin'
  },
  {
    id:'mode7',
    label: 'Random'
  }
];

  const hashChangeHandler = useCallback(() => {
    setLanguage(window.location.hash.replace('#', ''));
  }, []);

  useEffect(() => {
    window.addEventListener('hashchange', hashChangeHandler);
    return () => {
      window.removeEventListener('hashchange', hashChangeHandler);
    };
  }, []);
const [selectedMode, setSelectedMode] = useState(localStorage.getItem('selectedMode') || modes[1].id); // Default selected

const [selectedOrder, setSelectedOrder] = useState(localStorage.getItem('selectedOrder') || orders[0].id); // Default selected

const [selectedPracticeType, setSelectedPracticeType] = useState(localStorage.getItem('selectedPracticeType') || practiceTypes[0].id); // Default selected

const loadGroup = useCallback((group) => {

      setLastGroup(group);
      if(selectedOrder === 'order2') {
        setActivePractice(getQueueWordsFromGroup(group, lastIndex));
        setLastIndex( lastIndex + 5 < getWordsArray(group).length ?  lastIndex + 5: 0);
      }else {

        setActivePractice(getRandomWordsFromGroup(group));
      }
}, [selectedPracticeType,  lastIndex, setLastGroup, setActivePractice, setLastIndex]);

    return <DataContext value={{language, activePractice: activePractice, mode: selectedMode, order: selectedOrder, practiceType: selectedPracticeType}}>
      <div className={selectedMode}>
        
      {
          activePractice ? <nav><div className="home-link" onClick={() => {
            setActivePractice(false)
          }}></div><div className="groups-trigger" onClick={() => {
            setLHSVisible(true)
          }}>Groups</div><div className="words-trigger" onClick={() => {
            setRHSVisible(true)
          }}>Words</div></nav> : null
          }
      <div>
        <div className={`header${activePractice ? ' hidden' : ''}${language ? ' shrink' : ''}`}>
          <img src={logo} alt=""/>
          <h1>Glypher</h1>
        </div>
        {!language ? <Languages /> :
        (<div className={`groups${activePractice ? ' lhs-sidebar' : ''}${lhsVisible ? ' visible' : ''}`}>
          <div className="sidebar-link" onClick={() => {
            setLHSVisible(false)
          }}></div>
          {groups.map(group => <Group onClick={() => {
            loadGroup(group);
          }} key={group.id} data={group}/>)}
        </div>)}

      </div>
      {language && !activePractice ? <div className={`groups lhs-sidebar${lhsVisible ? ' visible' : ''}`}><div className="sidebar-link" onClick={() => {
          setLHSVisible(false)
        }}></div></div> : null}
      {language && activePractice && lastGroup ? <div className={`groups rhs-sidebar${rhsVisible ? ' visible' : ''}`}>
        <div className="sidebar-link" onClick={() => {
          setRHSVisible(false)
        }}></div>
        <div className="mode-selector">
          {modes.map(mode => <div key={mode.id}><input type="radio" id={mode.id}
          value={mode.id}
          onChange={() => {
            setSelectedMode(mode.id);
            localStorage.setItem('selectedMode', mode.id)
          }}
          checked={selectedMode === mode.id} name="mode"/><label htmlFor={mode.id}>{mode.label}</label></div>)}
        </div>
        <div className="order-selector">
          {orders.map(mode => <div key={mode.id}><input type="radio" id={mode.id}
          value={mode.id}
          onChange={() => {
            setSelectedOrder(mode.id);
            localStorage.setItem('selectedOrder', mode.id)
          }}
          checked={selectedOrder === mode.id} name="order"/><label htmlFor={mode.id}>{mode.label}</label></div>)}
        </div>
        <div className="practice-selector">
          {practiceTypes.map(mode => <div key={mode.id}><input type="radio" id={mode.id}
          value={mode.id}
          onChange={() => {
            setSelectedPracticeType(mode.id);
            localStorage.setItem('selectedPracticeType', mode.id)
          }}
          checked={selectedPracticeType === mode.id} name="practiceType"/><label htmlFor={mode.id}>{mode.label}</label></div>)}
        </div>
        {lastGroup.words.split('\n').map(word => <div key={word}>{word}</div>)}</div>
      : null}
      {
          activePractice && language ? <Practice data={activePractice} mode={selectedMode} order={selectedOrder} reload={() => {
           loadGroup(lastGroup)
          }}/> : null
        }
    </div></DataContext>;
}