# RIR-Sharp

Responsive Image Resize based on Js Sharp library


# How it works

Image resizing by GET request:
	/resizedimage/<img-url>/<height>/<width>

Keep in mind that image url should be url encoded

Image resizing by POST request:
	/resizedimage/
	KEYS
	height	- int
	width	- int
	image	- Base64 string

Base64 string should not contain elements such as data:image/png;base64,
