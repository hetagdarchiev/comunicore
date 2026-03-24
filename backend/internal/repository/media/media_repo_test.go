package media

import (
	"bytes"
	"io"
	"testing"
)

func TestWriter(t *testing.T) {
	buf := make([]byte, 5)
	w := NewBufferWriter(buf)

	n, err := w.Write([]byte("hello world"))
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if n != 11 {
		t.Errorf("expected 11 bytes written, got %d", n)
	}
	if string(buf) != "hello" {
		t.Errorf("expected 'hello', got %q", string(buf))
	}

	n, err = w.Write([]byte("!!!"))
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if n != 3 {
		t.Errorf("expected 3 bytes written, got %d", n)
	}
	if string(buf) != "hello" {
		t.Errorf("expected 'hello' to remain unchanged, got %q", string(buf))
	}
}

func TestWriter_MultiWriter(t *testing.T) {
	mimeBuf := make([]byte, 5)
	mimeWriter := NewBufferWriter(mimeBuf)

	mainBuf := new(bytes.Buffer)

	mw := io.MultiWriter(mainBuf, mimeWriter)

	input := []byte("hello world")
	n, err := mw.Write(input)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if n != len(input) {
		t.Errorf("expected %d bytes written, got %d", len(input), n)
	}

	if mainBuf.String() != "hello world" {
		t.Errorf("expected 'hello world' in main buffer, got %q", mainBuf.String())
	}
	if string(mimeBuf) != "hello" {
		t.Errorf("expected 'hello' in mime buffer, got %q", string(mimeBuf))
	}
}
