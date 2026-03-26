let current = null;

export const SceneManager = {
    set(scene) {

        if (current?.destroy) {
            current.destroy();
        }

        current = scene;
    },

    get() {
        return current;
    }
};