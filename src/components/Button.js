import '../styles/Button.css';

export const Button = ({ text, icon, bgColor }) => {
   return (
      <button
         type="button"
         style={{
            backgroundColor: bgColor,
            boxShadow: `0px 5px 20px 1px ${bgColor}90`
         }}
      >
         <img src={icon} alt={text} />
         {text}
      </button >
   )
}
