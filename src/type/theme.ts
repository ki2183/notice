export const lightTheme:Theme = {
    body: '#ebebeb',
    text: '#363537',
    toggleBackground: '#fcfcfc',
    mainColor: '#e6328d',
    navBar: '#fcfcfc',
    border:'#999999',
    span:'dark_mode',
    lightText:"#9d9d9d",
    modal:"linear-gradient(161deg, rgb(223 223 223), rgb(186 186 186))"
  };
  
  export const darkTheme:Theme = {
    body: '#252424',
    text: '#fcfcfc',
    toggleBackground: '#3b3b3b',
    mainColor: '#fcfcfc',
    navBar: '#303030',
    border:'#999999',
    span:'light_mode',
    lightText:"#6d6d6d",
    modal:'linear-gradient(161deg, rgb(81, 81, 81),rgb(51 51 51))'
  };
  
  export type Theme = {
    body: string,
    text: string,
    toggleBackground: string,
    mainColor: string,
    navBar: string,
    border:string,
    span:string,
    lightText:string, 
    modal:string,
  }