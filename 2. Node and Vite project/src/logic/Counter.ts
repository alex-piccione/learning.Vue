import {ref} from "vue"

const counter = ref(0)

const increment = () => {
    counter.value++  
}

const CounterLogic = {
    counter: counter,
    increment: increment
}

export default CounterLogic