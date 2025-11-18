import { useState, useRef, useEffect, useCallback } from "react";

/** 
 * Custom hook that observes an elements visibility
 * @param {object} options - options for the IntersectionObserver: root, rootMargin, threshold
 * @returns {array} - returns [elementRef, isIntersecting] 
  */

export function useIntersection(callback, options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [elementRef, setElementRef] = useState(null)

  useEffect(() => {
    const newObserver = new IntersectionObserver(callback, options)

    if (elementRef) {
      newObserver.observe(elementRef)
    }

    return () => {
      if (elementRef) newObserver.unobserve(elementRef)
    }
  }, [options])

  return [isIntersecting, setElementRef]

}

const callback = ([entries]) => {
  entries.forEach(entry => {

  })
}

export function useMultiIntersection(options = {}) {
  const observerRef = useRef(null);
  const [visibleGames, setVisibleGames] = useState(new Set())

  // handle observer
  const handleIntersection = useCallback((entries) => {
    entries.forEach(entry => {
      const id = entry.target.dataset.elem;

      setVisibleGames(prev => {
        const newSet = new Set(prev);
        if (entry.isIntersecting) {
          newSet.add(id)
        } else {
          newSet.delete(id)
        }
        return newSet
      })
    })
  }, [])

  // create an observer
  useEffect(() => {
    observerRef.current = new IntersectionObserver(handleIntersection, {
      root: options.root || null,
      rootMargin: options.rootMargin || '0px',
      threshold: options.threshold || 0
    })

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    }
  }, [handleIntersection, options.root, options.rootMargin, options.threshold])

  // function to observe or as ref callback
  const observe = useCallback((element) => {
    if (element && observerRef.current) {
      observerRef.current.observe(element)
    }
  }, [])

  const unobserve = useCallback((element) => {
    if (element && observerRef.current) {
      observerRef.current.unobserve(element)
    }
  }, [])
  return { observe, unobserve, visibleGames }
}
