export interface ContrastRow {
  fg: string
  bg: string
  label: string
  expected: 'AAA' | 'AA' | 'AA-large/UI only' | 'FORBIDDEN'
  ratio: number
  actual: 'AAA' | 'AA' | 'AA-large/UI only' | 'FORBIDDEN'
  ok: boolean
}

export declare function readTokens(): Record<string, string>
export declare function luminance(hex: string): number
export declare function ratio(a: string, b: string): number
export declare function verdict(r: number): ContrastRow['actual']
export declare function evaluate(): ContrastRow[]
