export const lightTheme:Theme = {
    body: '#ebebeb',
    text: '#363537',
    toggleBackground: '#fcfcfc',
    mainColor: '#e6328d',
    navBar: '#fcfcfc',
    border:'#999999',
    span:'dark_mode'
  };
  
  export const darkTheme:Theme = {
    body: '#252424',
    text: '#fcfcfc',
    toggleBackground: '#3b3b3b',
    mainColor: '#fcfcfc',
    navBar: '#303030',
    border:'#999999',
    span:'light_mode'
  };
  
  export type Theme = {
    body: string,
    text: string,
    toggleBackground: string,
    mainColor: string,
    navBar: string,
    border:string,
    span:string,
  }