import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await new Promise(resolve => resolve('hash'))
  },

  async compare (): Promise<boolean> {
    return await new Promise(resolve => resolve(true))
  }
}))

const salt = 12
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  test('Should call hash with correct values', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.hash('any_value')
    expect(hashSpy).toHaveBeenLastCalledWith('any_value', salt)
  })

  test('Should return a valid hash on hash success', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce('hash_value')
    const hash = await sut.hash('any_value')
    expect(hash).toBe('hash_value')
  })

  test('Should throws if hash throws', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'hash').mockRejectedValueOnce(new Error())
    const promise = sut.hash('any_value')
    await expect(promise).rejects.toThrow()
  })

  test('Should call compare with correct values', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'compare')
    await sut.compare('any_value', 'any_hash')
    expect(hashSpy).toHaveBeenLastCalledWith('any_value', 'any_hash')
  })

  test('Should return true when compare succeeds', async () => {
    const sut = makeSut()
    const hash = await sut.compare('any_value', 'any_hash')
    expect(hash).toBe(true)
  })

  test('Should return false when compare fails', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false)
    const hash = await sut.compare('any_value', 'any_hash')
    expect(hash).toBe(false)
  })

  test('Should throw if compare throws', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'compare').mockRejectedValueOnce(new Error())
    const promise = sut.compare('any_value', 'any_hash')
    await expect(promise).rejects.toThrow()
  })
})
