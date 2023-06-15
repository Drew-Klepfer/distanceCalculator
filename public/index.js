var form = document.getElementById('form');
var pointACoord = document.getElementById("pointA");
var pointBCoord = document.getElementById("pointB");

console.log(pointACoord, pointBCoord);

form.addEventListener('submit', (event) => {
    validateInputs(event);
    //form.submit(); 
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
};

const setSuccess = element => {

    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
}

const validateInputs = (event) => {
    const pointAValue = pointACoord.value.trim();
    const pointBValue = pointBCoord.value.trim();

    if (pointAValue === '') {
        setError(pointACoord, 'Coordinate required!');
        event.preventDefault();
    } else if (!isValidCoordinate(pointAValue)) {
        setError(pointACoord, 'Please provide valid coordinates');
        event.preventDefault();
    } else if (pointBValue === '') {
        setError(pointBCoord, 'Coordinate required!');
        event.preventDefault();
    } else if (!isValidCoordinate(pointBValue)) {
        setError(pointBCoord, 'Please provide valid coordinates');
        event.preventDefault();
    } else {
        setSuccess(pointBCoord);
        setSuccess(pointACoord);
        return true;
    }
    return false;
};

const isValidCoordinate = coord => {
    console.log("coord:", coord);
    var reg = new RegExp('^(-?\\d+(\\.\\d+)?),(-?\\d+(\\.\\d+)?)$');
    var result = reg.test(coord);
    return result;
}



