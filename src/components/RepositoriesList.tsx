import { useState } from 'react'
import { useSelector } from '../hooks/useSelector'
import { useActions } from '../hooks/useActions'

const RepositoriesList: React.FC = () => {
  const [term, setTerm] = useState('')
  const [offset, setOffset] = useState(0)
  const size = 20

  const { searchRepositories } = useActions()
  const { data, error, loading } = useSelector((state) => state.repositories)

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setOffset(offset + size)
    searchRepositories(term, size, offset)
  }

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <input value={term} onChange={(e) => setTerm(e.target.value)} />
        <button>Search</button>
      </form>
      {error && <h3>{error}</h3>}
      {loading && <h3>Loading...</h3>}
      {!error && !loading && data.map((name) => <div key={name}>{name}</div>)}
    </div>
  )
}

export default RepositoriesList
