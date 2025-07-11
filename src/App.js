import { useState } from "react";
import { groups } from "./data";
import { Group } from "./Group";
import { Practice } from "./Practice";

function getRandomWordsFromGroup(group){

  return group.words.split('\n').sort(() => Math.random() - 0.5).slice(0, 3);
}

export function App() {
  const [activeGroup, setActiveGroup] = useState();
  const [activePractice, setActivePractice] = useState();
    return <div>
      <div>
      <div className="groups">
        {groups.map(group => <Group onClick={() => {console.warn(group);setActivePractice(getRandomWordsFromGroup(group))}} key={group.id} data={group}/>)}</div>
        {
          activePractice ? <Practice data={activePractice}/> : null
        }
      </div>
    </div>;
}