package apperror

import (
	"fmt"
)

type NotFoundError struct {
	Type string
	Name string
}

type NotUniqueError struct {
	Items []string
}

func NewErrNotFound(typeName, name string) error {
	return &NotFoundError{
		Type: typeName,
		Name: name,
	}
}
func (e *NotFoundError) Error() string {
	return fmt.Sprintf("%s with name %s not found", e.Type, e.Name)
}

// creates error with names list of parameters which is not unique.
func NewErrNotUnique(name ...string) error {
	return &NotUniqueError{
		Items: name,
	}
}
func (e *NotUniqueError) Error() string {
	return fmt.Sprintf("one of item %v already exists", e.Items)
}
