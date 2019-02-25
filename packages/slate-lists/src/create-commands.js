import wrapList from "./commands/wrap-list";
import unwrapList from "./commands/unwrap-list";
import toggleList from "./commands/toggle-list";
import unwrapListByKey from "./commands/unwrap-list-by-key";
import decreaseListItemDepth from "./commands/decrease-list-item-depth";
import increaseListItemDepth from "./commands/increase-list-item-depth";

const wrapWithOptions = (fn, options) => (...args) => fn(options, ...args);

export default options => ({
  wrapList: wrapWithOptions(wrapList, options),
  unwrapList: wrapWithOptions(unwrapList, options),
  toggleList: wrapWithOptions(toggleList, options),
  unwrapListByKey: wrapWithOptions(unwrapListByKey, options),
  decreaseListItemDepth: wrapWithOptions(decreaseListItemDepth, options),
  increaseListItemDepth: wrapWithOptions(increaseListItemDepth, options)
});
