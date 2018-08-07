import Releaser from "../Releaser";

export function release(cmd) {
    new Releaser(cmd).release();
}
