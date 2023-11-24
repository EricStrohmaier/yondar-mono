//zoom out function then display the profile
// with list of beacons etc
import { useEffect, useState } from "react"
import { getMyProfile } from "../libraries/Nostr"
import { nip19 } from "nostr-tools"
import { AccountProfile } from "./AccountProfile"
import { IdentityType } from "../types/IdentityType"
import "../scss/LogoButton.scss"
import { useMap } from "react-map-gl"
import { useNavigate } from "react-router-dom"

interface ViewProfileProps {
  npub: string;
  children?: React.ReactNode;
}

export const ViewProfile = ({ npub }: ViewProfileProps) => {
  const [metadata, setMetadata] = useState<IdentityType>()
  const hex = npub ? nip19.decode(npub).data.toString() : undefined
  const { current: map } = useMap()
  const navigate = useNavigate()


  useEffect(() => {
    map && console.log("zoom out")
    map &&
      map.flyTo({
        zoom: 3,
        duration: 2000,
      })
  }, [map])

  useEffect(() => {
    const getUserProfile = async () => {
      // getting users metadata potential later more stuff like reviews, list of places etc
      const loadedProfile = await getMyProfile(hex as string)
      setMetadata(loadedProfile)
    }
    getUserProfile()
  }, [hex])

  const [toggle, setToggle] = useState<boolean>(true)

  const doToggle = () => {
    setToggle(!toggle)
    navigate("/dashboard")
  }

  const outerClasses =
    "component-logobutton " + (toggle ? "active" : "inactive")

  const profile = (
    <div className="component-logobutton-menu">
      <div className="wrapper">
        <>{metadata ? <AccountProfile identity={metadata} /> : null}</>{" "}
      </div>
    </div>
  )

  return (
    <>
      <div className={outerClasses} onClick={doToggle}>
        {toggle && metadata ? profile : null}
    
      </div>
    </>
  )
}
