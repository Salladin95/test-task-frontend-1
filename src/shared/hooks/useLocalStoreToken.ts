import { useLocalStorage } from "react-use"

type Token = {
	accessToken: string
	refreshToken: string
}

export function useLocalStoreToken() {
	return useLocalStorage<Token | null>("token", null)
}
