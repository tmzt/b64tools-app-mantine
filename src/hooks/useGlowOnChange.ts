import React, { DependencyList, RefObject, useMemo, useState } from "react";

import "../styles/glow.css";


/**
 * Version of useMemo that applies a glow effect when any
 * of the dependencies change.
 * 
 * The element to glow must have the class "glowable" assigned.
 * 
 * See ./src/styles/glow.css for the glow effect.
 *
 * */
export const useGlowOnChange = <T, E = HTMLElement>(factory: (ref: RefObject<E>) => T, deps: DependencyList): T => {
    const [hasRendered, setHasRendered] = useState(false);

    const ref = React.createRef<E>();

    return useMemo<T>(() => {
        console.info(`useGlowOnChange: rendering (hasRendered: ${hasRendered})`);

        const result = factory(ref);

        if (ref.current && hasRendered) {
            const element = ref.current as unknown as HTMLElement;

            element.classList.add('glow');

            // Removes the glow class so it can be added again.
            // The css animation will be complete after 0.2s (200ms).
            setTimeout(() => {
                element.classList.remove('glow');
            }, 400);
        }

        setHasRendered(true);

        return result as T;
    }, deps);

};
