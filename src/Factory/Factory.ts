export default abstract class Factory<P> {
  abstract create(type: any, key?: string): P
}
