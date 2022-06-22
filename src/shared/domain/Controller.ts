export interface Controller {
  route(): string
  handler(): Function
}