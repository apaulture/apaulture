import { useState } from "react"
import { LuKeyboard } from "react-icons/lu"
import { MdEmail } from "react-icons/md"

function App() {
  const alphabets = "abcdefghijklmnopqrstuvwxyz".split("")
  const inclusion = [
    {accent: "oklch(82.3% 0.12 346.018)", text: "text-white"},
    {accent: "oklch(95.6% 0.045 203.388)", text: "text-slate-500"},
    {accent: "oklch(55.4% 0.135 66.442)", text: "text-white"},
    {accent: "oklch(14.7% 0.004 49.25)", text: "text-white"},
    {accent: "rgb(255, 255, 255)", text: "text-slate-500"},
    {accent: "oklch(94.5% 0.129 101.54)", text: "text-slate-500"},
  ]
  const [cursorColor, setCursorColor] = useState(inclusion[0].accent)
  const [backgroundColor, setBackgroundColor] = useState(inclusion[4].accent)
  const [currentTextColor, setCurrentTextColor] = useState(inclusion[4].text)
  const [userText, setUserText] = useState("")
  const isMobile = /mobi/i.test(navigator.userAgent)
  
  document.onkeydown = (event) => {
    if (userText.length < 17) {
      if (event.key == " ") {
        setUserText(userText + event.key)
      } else {
        const random = Math.floor(Math.random() * (alphabets.length - 1))
        setUserText(userText + alphabets[random])
      }
    }
    event.key == "Backspace" && setUserText(userText.slice(0, userText.length - 1))
    event.key == "Enter" && setUserText("")
  }

  const transform = () => {
    let random
    // Randomly pick a different accent until background and cursor colors do not match
    do {
      random = Math.floor(Math.random() * (inclusion.length))
    } while (inclusion[random].accent == cursorColor)
    setCursorColor(inclusion[random].accent)
    setBackgroundColor(cursorColor)
    const matchedInclusion = inclusion.filter(i => i.accent == cursorColor)
    setCurrentTextColor(matchedInclusion[0].text)
  }

  const toggleKeyboard = () => {
    if ("virtualKeyboard" in navigator) {
      navigator.virtualKeyboard.show()
    }
  }
  return (
    <div className={"grid h-screen " + currentTextColor} style={{backgroundColor: backgroundColor}}>
      <div className="grid gap-2 w-80 place-self-center place-self-center p-2 bg-white/20">
        <kbd className="flex gap-2">
          apaulture
          $
          <div className="flex">
            <pre>{userText}</pre>
            <svg width="10" height="24" onClick={transform} className="cursor-pointer hover:opacity-80">
              <rect width="10" height="24" fill={cursorColor} />
            </svg>
          </div>
        </kbd>
        <div className="grid text-sm">
          <span className="font-semibold">approach</span>
          <span>design with love</span>
          <span>less is more</span>
          <span>respect user privacy</span>
        </div>
        <div className="flex gap-3 text-2xl">
          <a href="mailto:9xxp593l8@mozmail.com" className="hover:opacity-80"><MdEmail /></a>
          {isMobile && <button className="hover:opacity-80 cursor-pointer" type="button" onClick={toggleKeyboard}><LuKeyboard /></button>}
        </div>
      </div>
    </div>
  )
}

export default App
