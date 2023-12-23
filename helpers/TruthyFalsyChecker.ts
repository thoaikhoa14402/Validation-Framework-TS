export default class TruthyFalsyChecker {
  static check(value: any): string | boolean {
    return !!value;
  }
}
