import { useState, useRef } from "react"
import { BsArrowReturnLeft, BsGithub } from "react-icons/bs"
import { MdEmail } from "react-icons/md"

const charactersSupport = 25
const characters = [
  // English
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
  'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
  ' ', '.', ',', '!', '?', ';', ':', '-', '—', '–', "'", '"', '‘', 
  '’', '“', '”', '(', ')', '[', ']', '{', '}', '/', '\\', '&', '@', 
  '#', '%', '$', '¢', '£', '+', '=', '*', '_', '<', '>', '^', '`', '~',

  // Thai
  'ก', 'ข', 'ฃ', 'ค', 'ฅ', 'ฆ', 'ง', 'จ', 'ฉ', 'ช', 'ซ', 'ฌ', 'ญ', 'ฎ', 'ฏ', 
  'ฐ', 'ฑ', 'ฒ', 'ณ', 'ด', 'ต', 'ถ', 'ท', 'ธ', 'น', 'บ', 'ป', 'ผ', 'ฝ', 'พ', 
  'ฟ', 'ภ', 'ม', 'ย', 'ร', 'ล', 'ว', 'ศ', 'ษ', 'ส', 'ห', 'ฬ', 'อ', 'ฮ',
  'ะ', 'ั', 'า', 'ำ', 'ิ', 'ี', 'ึ', 'ื', 'ุ', 'ู', 'ฺ', 
  'เ', 'แ', 'โ', 'ใ', 'ไ', 'ๅ', '็', '์', 'ํ', '๎',
  '่', '้', '๊', '๋',
  '๐', '๑', '๒', '๓', '๔', '๕', '๖', '๗', '๘', '๙',
  '฿', 'ฯ', '๚', '๛', '๏'
]

const inclusion = [
  {accent: "oklch(82.3% 0.12 346.018)", text: "text-white"},
  {accent: "oklch(95.6% 0.045 203.388)", text: "text-slate-600"},
  {accent: "oklch(55.4% 0.135 66.442)", text: "text-white"},
  {accent: "oklch(14.7% 0.004 49.25)", text: "text-white"},
  {accent: "rgb(230, 230, 230)", text: "text-slate-600"},
  {accent: "oklch(94.5% 0.129 101.54)", text: "text-slate-600"},
]

function App() {
  // User input states
  const [isTyping, setIsTyping] = useState(false)
  const [returnToggled, setReturnToggled] = useState(false)
  const [cursorColor, setCursorColor] = useState(inclusion[0].accent)
  const [cursorWwidth, cursorHeight] = [8, 20]
  const inputRef = useRef(null);
  const cursorElement = (
    <svg
      viewBox={`0 0 ${cursorWwidth} ${cursorHeight}`}
      width={cursorWwidth}
      height={cursorHeight}
      className={`hover:opacity-80 cursor-pointer cursor ${isTyping ? "typing" : ""} ${returnToggled ? "loading" : ""}`}
      onClick={(e) => {
        e.stopPropagation()
        transform()
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }}
    >
      <rect width={cursorWwidth} height={cursorHeight} fill={cursorColor} />
    </svg>
    
  )
  const timeoutRef = useRef(null)
  const [backgroundColor, setBackgroundColor] = useState(inclusion[4].accent)
  const [currentTextColor, setCurrentTextColor] = useState(inclusion[4].text)
  const [userText, setUserText] = useState("")
  
  document.onkeydown = (event) => {
    if (userText.length < charactersSupport && characters.includes(event.key)) {
      setUserText(userText + event.key)
      setIsTyping(true)
      clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => {
        setIsTyping(false)
      }, 500)
    }

    // Delete
    event.key === "Backspace" && setUserText(userText.slice(0, userText.length - 1))

    // Send email
    if (event.key === "Enter") {
      setReturnToggled(true)
      setTimeout(() => {
        window.location.href = "mailto:hello@apaulture.com?subject=hello&body=" + userText
        setUserText("")
        setReturnToggled(false)
      }, 1500)
    }
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

  return (
    <div className={"grid h-screen " + currentTextColor} style={{backgroundColor: backgroundColor}}>
      <div className="grid rounded gap-4 p-3 w-88 place-self-center place-self-center p-2 bg-white/40">
        <kbd className="flex text-sm gap-2">
          apaulture
          $
          <div className="flex">
            <pre>{userText}</pre>
            <div style={{ position: "relative", display: "inline-block" }}>
              {/* Hidden input field required to invoke the virtual keyboard */}
              <input
                ref={inputRef}
                type="text"
                style={{
                  position: "absolute",
                  opacity: 0,
                  pointerEvents: "none",
                  height: 0,
                  width: 0,
                  border: "none",
                  outline: "none",
                }}
                aria-hidden="true"
              />
              {cursorElement}
            </div>
          </div>
        </kbd>

        <kbd className="text-xs">
          <span className="opacity-70">{charactersSupport - userText.length} characters remaining<br /></span>
          <span className={userText.length == 0 ? "opacity-70" : ""}>
            <BsArrowReturnLeft className="inline" /> to prepare email
          </span>
        </kbd>

        {/* Approach/Philosophy */}
        <div className="grid text-sm">
          <span className="font-semibold">approach</span>
          <span>design for inclusivity</span>
          <span>engineer with intent</span>
          <span>less is more</span>
        </div>
        <div className="flex gap-3 text-2xl">
          <a href={`mailto:hello@apaulture.com?subject=hello&body=${userText}`} className="hover:opacity-80"><MdEmail /></a>
          <a href="https://github.com/apaulture" className="hover:opacity-80"><BsGithub /></a>
        </div>
      </div>
    </div>
  )
}

export default App
