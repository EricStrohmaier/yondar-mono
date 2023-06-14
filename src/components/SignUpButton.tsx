import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { IdentityContextType } from "../types/IdentityType"
import { IdentityContext } from "../providers/IdentityProvider"
import { generatePrivateKey, getPublicKey } from 'nostr-tools'
import { encryptAndStorePrivateKey } from '../libraries/EncryptAndStoreLocal'

export const SignUpButton = () => {
  const { identity, setIdentity } = useContext<IdentityContextType>(IdentityContext)
  const navigate = useNavigate()

  const newIdentity = () => {
    const sk = generatePrivateKey() // `sk` is a hex string
    const pk = getPublicKey(sk) // `pk` is a hex string
    setIdentity({pubkey: pk})
    encryptAndStorePrivateKey(sk)
    navigate('/login')
  }

  if (identity) {
    return null
  } else {
    return (
      <button onClick={newIdentity}>Create new identity</button>
    )
  }
}