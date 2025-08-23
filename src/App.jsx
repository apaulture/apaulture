import { useState } from "react"
import { MdEmail } from "react-icons/md"

function App() {
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
  const alphabets = "abcdefghijklmnopqrstuvwxyz".split("")
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
      console.log(random)
    } while (inclusion[random].accent == cursorColor)
    setCursorColor(inclusion[random].accent)
    setBackgroundColor(cursorColor)
    const matchedInclusion = inclusion.filter(i => i.accent == cursorColor)
    setCurrentTextColor(matchedInclusion[0].text)
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
          <span>humans over ai</span>
          <span>privacy is paramount</span>
          <span>less is more</span>
        </div>
        <div className="flex">
          <a href="mailto:9xxp593l8@mozmail.com" className="flex hover:opacity-80 text-2xl"><MdEmail /></a>
        </div>
      </div>
    </div>
  )
}

export default App
