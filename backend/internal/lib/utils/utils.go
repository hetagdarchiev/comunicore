// SPDX-License-Identifier: MIT
// Copyright 2026 Alex Syrnikov <alex19srv@gmail.com>

package utils

import "crypto/rand"

func RandomBytes(count int) []byte {
	buf := make([]byte, count)
	rand.Read(buf)

	return buf
}

func RandomString(len int) string {
	return string(RandomBytes(len))
}
