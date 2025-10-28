import { useEffect, useState } from "react";

const languages = [{
  title: 'English',
  code: 'en'
}, 
{title: 'Chinese',
code: 'zh'}];

export function Languages() {
  const [custom, setCustom] = useState([]);
    useEffect(() => {
      if(localStorage.getItem('customLanguages')) {
        setCustom(JSON.parse(localStorage.getItem('customLanguages')));
      }
    }, []);
    return <div className={`groups com-list-languages`}>
              {[...languages, ...custom, {title: '+ Add', className: 'btn-add-language', code: 'custom'}].map(language => <div onClick={() => {
                if (language.code === 'custom') {
                  const title = window.prompt('language title');
                  const code = window.prompt('language code');
                  const updatedList = [...custom, {title, code}];
                  setCustom(updatedList);
                  localStorage.setItem('customLanguages', JSON.stringify(updatedList))
                } else {
                  location.hash = language.code;
                }
              }} key={language.code} className={language.className || 'btn-'+language.code} data={language}>{language.title}</div>)}</div>;
}