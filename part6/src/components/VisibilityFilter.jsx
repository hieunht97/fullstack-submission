import { filterChange } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const VisibilityFilter = (props) => {
  const dispatch = useDispatch()

  return (
    <div>
      <div>
        all{' '}
        <input
          type="radio"
          name="filter"
          onChange={() => dispatch(filterChange('ALL'))}
        />
        <br />
        important{' '}
        <input
          type="radio"
          name="filter"
          onChange={() => dispatch(filterChange('IMPORTANT'))}
        />{' '}
        <br />
        non-important{' '}
        <input
          type="radio"
          name="filter"
          onChange={() => dispatch(filterChange('NONIMPORTANT'))}
        />
      </div>
    </div>
  )
}

export default VisibilityFilter
