import axios from "~/app/axios"

type Token = { access_token: string; refresh_token: string }

export async function refreshToken(refreshToken: string): Promise<Token> {
	const res = await axios.post<Token>("/auth/refresh-token", {
		refreshToken,
	})
	return res.data
}
