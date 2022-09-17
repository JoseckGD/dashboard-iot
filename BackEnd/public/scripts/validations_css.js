//Source: https://github.com/EfrenOR/validations.git
const typeValidations = [
    {
        name: 'only-words',
        inputs: [],
        methodValidation: (targetInput, $warn, previousStatus, required, displaywarnings) => { //Method when using a Regular Expression 
            if (previousStatus || previousStatus === null) {
                let valueInput = targetInput.value
                let regExp = (/[0-9]/gim);//Regular Expression to validate

                if (regExp.test(valueInput)) {//VALIDATION
                    if (valueInput === "" && !required) return true;

                    if (valueInput === "" && required) return false;

                    if (displaywarnings || displaywarnings == undefined) displayWarn($warn, 'Enter only non-numeric characters', false, targetInput)//Display the error
                    return false;

                } else if (!regExp.test(valueInput) && !required) {
                    return true;
                }

            } else {
                return false
            }

            return true;//When the input passes validation
        }
    },
    {
        name: 'email',
        inputs: [],
        methodValidation: (targetInput, $warn, previousStatus, required, displaywarnings) => {
            if (previousStatus || previousStatus === null) {
                let valueInput = targetInput.value
                let regExp = (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
                if (!regExp.test(valueInput)) {//VALIDATION
                    if (valueInput === "" && !required) return true;

                    if (valueInput === "" && required) return false;

                    if (displaywarnings || displaywarnings == undefined) displayWarn($warn, 'Enter a valid email address', false, targetInput);
                    return false;

                } else if (regExp.test(valueInput) && !required) {
                    return true;
                }
            } else {
                return false
            }

            return true;
        }
    },
    {
        name: 'only-numbers',
        inputs: [],
        methodValidation: (targetInput, $warn, previousStatus, required, displaywarnings) => {
            if (previousStatus || previousStatus === null) {
                let valueInput = targetInput.value
                let regExp = (/^[0-9]+$/gim);
                if (!regExp.test(valueInput)) {//VALIDATION
                    if (valueInput === "" && !required) return true;

                    if (valueInput === "" && required) return false;

                    if (displaywarnings || displaywarnings == undefined) displayWarn($warn, 'Enter only numeric characters', false, targetInput)
                    return false;

                } else if (regExp.test(valueInput) && !required) {
                    return true;
                }
            } else {
                return false
            }

            return true;
        }
    },
    {
        name: 'required',
        inputs: [],
        methodValidation: (targetInput, $warn, previousStatus, required, displaywarnings) => {//Method when not using a Regular Expression 
            if (previousStatus || previousStatus === null) {
                let valueInput = targetInput.value
                if (valueInput === "") {//VALIDATION
                    if (displaywarnings || displaywarnings == undefined) { displayWarn($warn, '*Required', false, targetInput) }
                    return false;
                }
            } else {
                return false;
            }
            return true;
        }
    },
    {
        name: 'maxLength-',
        inputs: [],
        methodValidation: (targetInput, $warn, previousStatus, required, displaywarnings) => {
            if (previousStatus || previousStatus === null) {
                let valueInput = targetInput.value
                let range = ((Array.from(targetInput.dataset.validation.split(" ")).filter(dataAttr => dataAttr.includes('maxLength-')))[0]).slice(10);
                if (valueInput.length > range) {//VALIDATION                
                    if (displaywarnings || displaywarnings == undefined) displayWarn($warn, `Enter a max of ${range} characters`, false, targetInput)
                    return false;
                }
            } else {
                return false;
            }
            return true;
        }
    },
    {
        name: 'samePassword',
        inputs: [],
        methodValidation: (targetInput, $warn, previousStatus, required, displaywarnings) => {
            if (previousStatus || previousStatus === null) {
                let InputPassword = document.querySelector('input[type=password]');
                let valueInput = targetInput.value
                if (valueInput !== InputPassword.value) {//VALIDATION
                    if (displaywarnings || displaywarnings == undefined) { displayWarn($warn, "Your passwords don't match", false, targetInput) }
                    return false;
                }
            } else {
                return false;
            }
            return true;
        }
    },
    {
        name: 'numbers-commma',
        inputs: [],
        methodValidation: (targetInput, $warn, previousStatus, required, displaywarnings) => {
            if (previousStatus || previousStatus === null) {
                let valueInput = targetInput.value
                let regExp = (/^(\d+)(,\s*\d+)*$/gim);
                if (!regExp.test(valueInput)) {//VALIDATION
                    if (valueInput === "" && !required) return true;

                    if (valueInput === "" && required) return false;

                    if (displaywarnings || displaywarnings == undefined) displayWarn($warn, 'Enter only numbers separated by commas', false, targetInput)
                    return false;

                } else if (regExp.test(valueInput) && !required) {
                    return true;
                }
            } else {
                return false
            }

            return true;
        }
    },
    {
        name: 'numbers-decimal-commma',
        inputs: [],
        methodValidation: (targetInput, $warn, previousStatus, required, displaywarnings) => {
            if (previousStatus || previousStatus === null) {
                let valueInput = targetInput.value
                let valueInput2 = valueInput.split(',').join('')
                valueInput2 = valueInput2.split('.').join('')
                let regExp = (/^[0-9]+$/gim);//true
                if (!regExp.test(valueInput2)) {//VALIDATION
                    if (valueInput === "" && !required) return true;

                    if (valueInput === "" && required) return false;

                    if (displaywarnings || displaywarnings == undefined) displayWarn($warn, 'Enter only numbers separated by commas', false, targetInput)
                    return false;

                } else if (regExp.test(valueInput) && !required) {
                    return true;
                }
            } else {
                return false
            }

            return true;
        }
    }
]


//THIS METHOD COMPARES THE DATA-VALIDATION WITH THE NAME PROPERTY OF THE OBJECTS, OF THE ARRAY 'typesValidations'
function exists(dataAttribute, $input) {
    let flag = false;
    let regExp;
    if (dataAttribute !== 'required') {
        dataAttribute.forEach(el => {
            typeValidations.forEach(obj => {
                regExp = RegExp(`${obj.name}`, "gmi")
                if (regExp.test(el)) {
                    obj.inputs.push($input)
                }
            })
        })
    } else {
        typeValidations.forEach(obj => {
            if (((/required/i).test($input.dataset.validation))) {
                flag = true;
            }
        })
    }

    return flag
}

//METHOD TO CREATE THE <SPANS> ELEMENTS FOR EACH <INPUT> ELEMENT, WHICH WILL DISPLAY THE ERROR MESSAGE OF VALIDATION
const createwarnings = ($inputs) => {
    $inputs.forEach(input => {
        const $span = document.createElement('span')
        $span.textContent = "Mensaje de Advertencia"
        $span.classList.add(input.name, 'hidden')
        input.insertAdjacentElement('afterend', $span)
    })
}

//METHOD TO MAKE CHANGES OF STYLES IN THE <INPUTS> ACCORDING THE VALIDATION RESULT
const displayWarn = ($warn, message, status, input) => { //'status' indicate the current validation
    let band = null //it'll indicate the previous result of the validation of the same <input>

    if (Array.from(input.classList).includes('border-red-400')) {
        band = 1 //The input didn't pass the validation          
    } else if (Array.from(input.classList).includes('border-green-600')) {
        band = 0 //The input passed the validation    
    }

    if (band === 1 && status) { //Current validation is correct so..
        input.classList.replace('border-red-400', 'border-green-600');
        $warn.classList.add('hidden');

    } else if (band === 0 && status === false) {//Current validation is incorrect soo..
        input.classList.replace('border-green-600', 'border-red-400');
        $warn.classList.remove('hidden');//Display the error
        $warn.textContent = message//New error message is defined

    } else if (band === 1 && status === false) {//Current validation is incorrect again so..
        $warn.classList.remove('hidden');
        $warn.textContent = message
    }


    //When band is null, it's mean that the input has not been validated yet
    if (band === null && status) {//The validation is correct
        input.classList.add('border-green-600')

    } else if (band === null && status === false) {//The validation is incorrect
        input.classList.add('border-red-400')
        $warn.classList.remove('hidden');
        $warn.textContent = message
    }

}

//METHOD TO GET THE POSITIONS OF THE TYPES OF VALIDATIONS INSIDE THE ARRAY 'typeValidations'
const getPosition = (types, typeValidations) => {
    let index = [];
    typeValidations.forEach((obj, position) => {
        if (types !== 'required') {
            types.forEach((type) => {
                if (obj.name === type) {
                    index.push(position);
                }
            })
        } else {
            if (obj.name === types) {
                index.push(position);
            }
        }
    })

    return index //Devuleve la posicion
}

//METHOD IN CHARGE OF CALL THE VALIDATION DEPENDING OF THE INPUT
const validar = (res, regExp, e, displaywarnings) => {
    try {
        if (e.dataset.validation) { //only execute to the element with data-validation
            
            res = []//will store the validation results
            let count = 0;
            const DATAVALIDATION = {//Object that will help getting the necessary info according to the type of validation of the <input>
                                    
                type: e.dataset.validation.split(" "),
                getPositionOfValidationType: function () { return getPosition(this.type, typeValidations) }
            }

            const $warn = document.querySelector(`.${e.name}`)//Get the <span> of the <input>
            let required = ((/required/gm).test(e.dataset.validation));//Verify if the <input> is required  
            try {
                DATAVALIDATION.getPositionOfValidationType().forEach((position, interval) => {//Execute according the amount of validation types have the <input>
                    let methodValidation = typeValidations[position].methodValidation(e, $warn, null, required, displaywarnings)//Method when it's the first validation
                    let methodValidationWithpreviousStatus = typeValidations[position].methodValidation(e, $warn, res[count], required, displaywarnings)//Method when it's not the first validation of the input
                    let typeValidation = typeValidations[position].name;//Get the current type of validation

                    res.push((interval == 0) ? methodValidation : methodValidationWithpreviousStatus)

                    //Get other <input> with the same validations and apply 'em
                    typeValidations.forEach((obj) => {
                        regExp = RegExp(`${obj.name}`, "gmi")
                        if ((regExp.test(e.dataset.validation)) && (obj.name !== typeValidation)) {
                            res.push(obj.methodValidation(e, $warn, res[count], null, displaywarnings))
                            count++//To traverse the array res[] and get the previous result of the validation
                        }
                    })

                })

            } catch (e) {
                console.error(`Error: Error please verify that you added the validation method --- ${e}`)
            }

            //if the last value of res[] is true that means the input passed all previous validations
            if (res[res.length - 1]) { displayWarn($warn, 'Correct Validations', true, e) }
        }
    } catch (e) {
        console.error(`Error: ${e}`)
    }
}

//METHOD TO CHECK THAT THE INPUTS ARE VALIDATED, THIS IS FOR THE SUBMIT
const validarSubmit = (res, regExp, e, inputs, displaywarnings) => {
    res = []
    inputs.forEach(input => {
        if (e === null) { e = input }
        let count = 0;

        const DATAVALIDATION = {
            type: 'required',
            getPositionOfValidationType: function () { return getPosition(this.type, typeValidations) }
        }

        const $warn = document.querySelector(`.${e.name}`)
        let required = ((/required/gm).test(e.dataset.validation));
        if (exists(DATAVALIDATION.type, e)){
             res.push(typeValidations[DATAVALIDATION.getPositionOfValidationType()].methodValidation(e, $warn, null, null, displaywarnings));
        }
        e = null;
    })

    //The 'resFilter' will store the result of 'required' validation of each input
    let resFilter = res.filter(resultado => resultado === true)

    //if the resFilter length is different than the res[] length, means that there are <inputs> 'required' and are empty 
    if (resFilter.length !== res.length) {
        return false;
    }

    return true;
}

//This variable will stored the validation result
let signalToValidation = null;

export default function () {
    const $inputs = document.querySelectorAll('[data-validation]');

    createwarnings($inputs)

    //Catalog each <input> inside of an object of the array 'tipos Validaciones' according the type of validation 
    $inputs.forEach($input => {
        let dataAttribute = Object.values({ ...$input.dataset.validation.split(' ') })
        exists(dataAttribute, $input)
    })
    //console.log(typeValidations)

    let res = [], regExp = null;

    //========================================================
    //  EVENT TO VALIDATE WHILE IS WRITING ON THE INPUT
    //========================================================
    document.addEventListener('keyup', e => {
        validar(res, regExp, e.target)
    })

    //======================================================================
    //  EVENT TO VALIDATE WHEN AN INPUT OR SELECT CHANGES
    //======================================================================
    document.addEventListener('change', e => {
        validar(res, regExp, e.target)
    })


    //===================================================================================================
    //  EVENTO TO VALIDATE WHEN SENDING A FORM
    //===================================================================================================

    //Error alert when submitting form
    const $errorSubmit = document.createElement('span');
    $errorSubmit.classList.add('hidden')


    document.addEventListener('submit', e => {
        if (document.querySelector('.border-red-400') || !validarSubmit(res, regExp, null, $inputs, false)) {
            e.preventDefault()
            signalToValidation = false;
            $errorSubmit.textContent = "Check your data or enter them";
            $errorSubmit.classList.remove('hidden')
            document.querySelector('[data-warn]').insertAdjacentElement('beforebegin', $errorSubmit)
        }else{
            e.preventDefault()
            $errorSubmit.classList.add('hidden')
            signalToValidation = true;
        }


    })
}


/* We can access to this variable with the validation result in others script and handle the submit there or to do 
 something else...*/
export {signalToValidation};