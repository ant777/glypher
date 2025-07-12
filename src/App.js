import { useState } from "react";
import { groups } from "./data";
import { Group } from "./Group";
import { Practice } from "./Practice";
import { shuffle } from "./tools";

const logo = new URL('./assets/img.svg', import.meta.url);
function getRandomWordsFromGroup(group){

  return shuffle(group.words.split('\n')).slice(0, 5);
}

export function App() {
  const [activeGroup, setActiveGroup] = useState();
  const [lastGroup, setLastGroup] = useState();
  const [activePractice, setActivePractice] = useState();
  const modes = [{
    id:'mode0',
    label: 'Explore'
  },
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
  }
];

const [selectedMode, setSelectedMode] = useState(modes[1].id); // Default selected

    return <div className={selectedMode}>
      <div>
        <div className="mode-selector">
          {modes.map(mode => <div key={mode.id}><input type="radio" id={mode.id}
          value={mode.id}
          onChange={() => {
            setSelectedMode(mode.id);
          }}
          checked={selectedMode === mode.id} name="mode"/><label htmlFor={mode.id}>{mode.label}</label></div>)}
        </div>
        <div className={`header${activePractice ? ' hidden' : ''}`}>
          <h1>Glypher</h1>
          <img src={logo} alt=""/>
        </div>
      <div className={`groups${activePractice ? ' lhs-sidebar' : ''}`}>
        {groups.map(group => <Group onClick={() => {setLastGroup(group);setActivePractice(getRandomWordsFromGroup(group))}} key={group.id} data={group}/>)}</div>

      </div>
      {
          activePractice ? <Practice data={activePractice} mode={selectedMode} reload={() => {
            setActivePractice(getRandomWordsFromGroup(lastGroup))
          }}/> : null
        }
    </div>;
}