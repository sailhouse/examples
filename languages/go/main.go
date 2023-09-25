package main

import (
	"encoding/json"
	"net/http"
	"os"

	"github.com/sailhouse/sdk-go/sailhouse"
)

type CreateUserRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func main() {
	client := sailhouse.NewSailhouseClient(os.Getenv("SAILHOUSE_TOKEN"))

	http.HandleFunc("/api/user", func(w http.ResponseWriter, r *http.Request) {
		var req CreateUserRequest
		err := json.NewDecoder(r.Body).Decode(&req)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		id, err := createUser(req.Email, req.Password)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		err = client.Publish("user-created", map[string]any{
			"id":    id,
			"email": req.Email,
		})
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
	})

	http.HandleFunc("/api/emails/welcome", func(w http.ResponseWriter, r *http.Request) {
		var req map[string]any
		err := json.NewDecoder(r.Body).Decode(&req)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		err = sendWelcomeEmail(req["email"].(string))
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
	})

	http.ListenAndServe(":8080", nil)
}

func createUser(email, password string) (string, error) {
	return "user-1", nil
}

func sendWelcomeEmail(email string) error {
	return nil
}
