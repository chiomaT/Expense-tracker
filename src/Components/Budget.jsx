import {Card, ProgressBar, Stack, Button} from 'react-bootstrap'
import {currencyFormatter }  from '../utils'


function Budget({name,amount,max, gray, hideButtons, onAddExpenseClick, onViewExpenseClick}) {
  const classNames =[]
  if(amount > max) {
    classNames.push('bg-danger bg-opacity-10')
  }else if(gray) {
    classNames.push('bg-light')
  }
  return (
    <Card className={classNames.join(" ")}>
        <Card.Body>
        <Card.Title className="d-flex justify-content-between gap= 20px align-items-baseline fw-normal mb-3">
            <div className ="me-2">{name}</div>
            <div className ="d-flex align-items-baseline">{currencyFormatter.format(amount)} {max && (<span className="text-muted fs-6">/ {currencyFormatter.format(max)}</span>)} </div>
        </Card.Title>
        {max &&
        (<ProgressBar className ="rounded-pill" variant={getProgressBarVariant(amount,max)}
          min ={0}
          max ={max}
          now={amount}
          />
        )}

        {!hideButtons &&  (<Stack direction="horizontal" gap ="2" className="mt-4">
          <Button variant="outline-primary" className="ms-auto"onClick ={onAddExpenseClick}>Add expense</Button>
          <Button variant ="secondary" onClick ={onViewExpenseClick}>View expense</Button>
        </Stack>)}
        
        </Card.Body>
    </Card>
  )
}

const getProgressBarVariant=(amount, max) => {
const ratio = amount/max
if(ratio < 0.5) return "success"
if(ratio < 0.75) return "warning"
return "danger"


}

export default Budget