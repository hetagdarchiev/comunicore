package urlencode

import (
	"encoding/base64"
)

// encode bytes to URL safe Base64 string
func Encode(input []byte) string {
	dst := make([]byte, base64.RawURLEncoding.EncodedLen(len(input)))
	base64.RawURLEncoding.Encode(dst, input)

	return string(dst)
}

// decode URL safe Base64 string to bytes
func Decode(input string) ([]byte, error) {
	dst := make([]byte, base64.RawURLEncoding.DecodedLen(len(input)))
	_, err := base64.RawURLEncoding.Decode(dst, []byte(input))
	if err != nil {
		return nil, err
	}

	return dst, nil
}
