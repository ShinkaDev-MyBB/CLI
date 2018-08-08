import Releaser from "../Releaser";

export function release(cmd, config) {
    new Releaser(cmd, config).release();
}
