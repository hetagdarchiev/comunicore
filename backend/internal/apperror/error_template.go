// SPDX-License-Identifier: MIT
// Copyright 2026 Alex Syrnikov <alex19srv@gmail.com>

package apperror

// error handling algorythm:
//
//	if err != nil {
//	    return fmt.Errorf("error: %w\n caused by: %w", NewNotUniqueError(), err)
//	}
//
// here Error() with text description will go from Errorf,
// and NewNotUniqueError() will be used to create typed error that can be checked with errors.Is or errors.As

type UnspecifiedError struct {
	msg string
}

func NewUnspecifiedError(msg string) *UnspecifiedError {
	return &UnspecifiedError{msg: msg}
}
func (e *UnspecifiedError) Error() string {
	return "Unspecified error: " + e.msg
}

type NotUniqueError struct {
}

func NewNotUniqueError(name ...string) *NotUniqueError {
	return &NotUniqueError{}
}
func (e *NotUniqueError) Error() string {
	return "NotUniqueError"
}
