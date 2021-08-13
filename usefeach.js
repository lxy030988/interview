function useState() { }
function useEffect() { }

function useFeach(request, init = {}) {
  const [response, setResponse] = useState()
  const [error, setError] = useState()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const abortController = new AbortController()
      (async () => {
        try {

          const res = await fetch(request, {
            ...init,
            signal: abortController.signal
          })
          setResponse(res.json())
          setIsLoading(true)
        } catch (error) {
          setError(error)
        }
      })()

    return () => {
      abortController.abort()
    }
  }, [request, init])

  return [response, error, isLoading]
}