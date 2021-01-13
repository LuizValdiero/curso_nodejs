export interface Authentication {
  auth: (email: string, name: string) => Promise<string>
}
