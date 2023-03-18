const form = document.getElementById('myForm');

form.addEventListener('submit', (event) => {
	event.preventDefault();
	if (validateForm()) {
		sendTelegram();
	}
});

function validateForm() {
	const nameInput = document.getElementById('name');
	const emailInput = document.getElementById('email');
	const phoneInput = document.getElementById('phone');
	const wilayaInput = document.getElementById('wilaya');

	const name = nameInput.value.trim();
	const email = emailInput.value.trim();
	const phone = phoneInput.value.trim();
	const wilaya = wilayaInput.value.trim();

	if (name === '' || email === '' || phone === '' || wilaya === '') {
		alert('Please fill out all fields.');
		return false;
	}

	const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
	if (!emailRegex.test(email)) {
		alert('Please enter a valid email address.');
		return false;
	}

	const phoneRegex = /^\d{10}$/;
	if (!phoneRegex.test(phone)) {
		alert('Please enter a valid phone number.');
		return false;
	}

	return true;
}

function sendTelegram() {
	const name = document.getElementById('name').value;
	const email = document.getElementById('email').value;
	const phone = document.getElementById('phone').value;
	const wilaya = document.getElementById('wilaya').value;

	const message = `New sign-up:\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nWilaya: ${wilaya}`;

	const chatId = '-1001937285192'; // Replace with your Telegram channel ID
	const botToken = '6141393083:AAGT1PDZfxaP2AGCXa7KP1EarcOamJ8kMzM'; // Replace with your Telegram bot token

	const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;

	fetch(url)
		.then((response) => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json();
		})
		.then((data) => {
			console.log(data);
			alert('Thanks for signing up! We will be in touch soon.');
			form.reset();
		})
		.catch((error) => {
			console.error('There was a problem with the fetch operation:', error);
			alert('Oops! Something went wrong. Please try again later.');
		});
}
