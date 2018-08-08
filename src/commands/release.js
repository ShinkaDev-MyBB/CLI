import config from "../../shinka.json";
import Releaser from "../Releaser";

export function release(cmd) {
    new Releaser(cmd, config).release();
}
