// SPDX-License-Identifier: MIT
// Copyright 2026 Alex Syrnikov <alex19srv@gmail.com>

package apperror

import (
	"strings"
)

type ErrorChain struct {
	opName string // current operation produced error
	cause  error  // original error (can be ErrorChain or any other error)
	value  error  // error value
}

func (b *ErrorChain) WithCause(cause error) *ErrorChain {
	b.cause = cause
	return b
}
func (b *ErrorChain) InOperation(opName string) *ErrorChain {
	b.opName = opName
	return b
}

// error message including all wrapped errors
func (b *ErrorChain) Error() string {
	errValue := b.value
	if errValue == nil {
		return ""
	}
	var res strings.Builder
	res.Grow(4096)
	res.WriteString(errValue.Error() + "\n")

	errCause := b.cause
	for errCause != nil {
		switch cause := errCause.(type) {
		case *ErrorChain:
			res.WriteString("caused by: " + cause.value.Error() + "\n")
			errCause = cause.cause
			continue
		default:
			res.WriteString("caused by: " + errCause.Error() + "\n")
			errCause = nil
		}
	}
	return res.String()
}

type UnspecifiedError struct {
	msg string
}

func NewUnspecifiedError(msg string) *ErrorChain {
	return &ErrorChain{
		value: &UnspecifiedError{msg: msg},
	}
}
func (e *UnspecifiedError) Error() string {
	return e.msg
}
