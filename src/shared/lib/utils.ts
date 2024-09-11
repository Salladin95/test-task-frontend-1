/**
 * Clamps a value to a specified range.
 *
 * @param {Object} params - The parameters object.
 * @param {number} params.min - The minimum value of the range.
 * @param {number} params.max - The maximum value of the range.
 * @param {number} params.value - The value to be clamped.
 * @returns {number} - The clamped value within the specified range.
 *
 * @example
 * // Clamps the value to be between 0 and 100
 * const clampedValue = clampBetween({ min: 0, max: 100, value: 50 });
 */
export function clampBetween({ min, max, value }: { min: number; max: number; value: number }): number {
	return Math.max(min, Math.min(max, value))
}

/**
 * Calculates the progress percentage based on the current value and full value.
 * @param currentValue - The current value.
 * @param fullValue - The full value or maximum value.
 * @returns The progress percentage.
 */
export function calculateProgress(currentValue: number, fullValue: number): number {
	// Ensure that currentValue is not greater than fullValue
	const clampedCurrentValue = clampBetween({ min: 0, value: currentValue, max: fullValue })
	// Calculate the progress percentage
	return (clampedCurrentValue / fullValue) * 100
}

/**
 * Converts FormData to a plain object.
 *
 * @param {FormData} formData - The FormData object to be converted.
 * @returns {Object.<string, string>} The plain object representation of the FormData.
 */
export function formDataToObject(formData: FormData): { [key: string]: string } {
	const formObject: { [key: string]: string } = {}

	formData.forEach((value, key) => {
		if (typeof value === "string") {
			formObject[key] = value
		}
	})

	return formObject
}

/**
 * Retrieves random item of the given array
 * @param {unknown[]} arr
 * @returns {unknown}
 */
export function getRandomArrEl<T>(arr: T[]): T | null {
	if (arr instanceof Array) {
		return arr[Math.floor(Math.random() * arr.length)]
	}
	return null
}

export function getRandomInt(max: number) {
	return Math.floor(Math.random() * max)
}

/**
 * Creates a debounced function that delays the invocation of the provided function until after
 * a specified wait time has elapsed since the last time the debounced function was invoked.
 * Optionally, the function can be invoked immediately on the first call.
 *
 * @param func - The function to debounce.
 * @param wait - The number of milliseconds to delay.
 * @param immediate - If `true`, the function is invoked immediately on the first call.
 * @returns A new debounced function.
 */
export function debounce<T extends (...args: never[]) => unknown>(func: T, wait: number, immediate: boolean = false) {
	let timeout: ReturnType<typeof setTimeout> | null

	return function executedFunction(...args: Parameters<T>): void {
		const later = () => {
			timeout = null
			if (!immediate) {
				func(...args)
			}
		}

		const callNow = immediate && !timeout

		if (timeout) {
			clearTimeout(timeout)
		}

		timeout = setTimeout(later, wait)

		if (callNow) {
			func(...args)
		}
	}
}
