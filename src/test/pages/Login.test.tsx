import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { Login } from "../../pages"
import { MemoryRouter } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { vi } from "vitest";
import { au } from "vitest/dist/chunks/reporters.DAfKSDh5.js";



vi.mock("firebase/auth", () => ({
    signInWithEmailAndPassword: vi.fn(),
    getAuth: vi.fn(),
}))

describe("Login Form", () => {

    test("Render", () => {
        render(<MemoryRouter>
            <Login />
        </MemoryRouter>);

        expect(screen.getByLabelText("Email")).toBeInTheDocument();
        expect(screen.getByLabelText("Password")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Log In" })).toBeInTheDocument();
        expect(screen.getByTestId("toggle-password-icon")).toBeInTheDocument();
    })

    test("Invalid Email", async () => {
        render(<MemoryRouter>
            <Login />
        </MemoryRouter>);

        fireEvent.change(screen.getByLabelText("Email"), { target: { value: "invalid-email" } });
        fireEvent.change(screen.getByLabelText("Password"), { target: { value: "password123" } });

        fireEvent.click(screen.getByRole("button", { name: "Log In" }));

        await waitFor(() => {
            expect(screen.getByText("Please Enter Valid Email"))
        })
    })

    test("Invalid Password", async () => {
        render(<MemoryRouter>
            <Login />
        </MemoryRouter>);

        fireEvent.change(screen.getByLabelText("Email"), { target: { value: "email@example.com" } });
        fireEvent.change(screen.getByLabelText("Password"), { target: { value: "invalid-password" } });

        fireEvent.click(screen.getByRole("button", { name: "Log In" }));

        await waitFor(() => {
            expect(screen.getByText("Password must be at least 8 characters long and contain at least 1 letter and 1 number"))
        })
    })

    test("Toggle Password", () => {
        render(<MemoryRouter>
            <Login />
        </MemoryRouter>);

        const passwordInput = screen.getByLabelText("Password");
        const togglePasswordIcon = screen.getByTestId("toggle-password-icon");

        expect(passwordInput).toHaveAttribute("type", "password");

        fireEvent.click(togglePasswordIcon);
        expect(passwordInput).toHaveAttribute("type", "text");

        fireEvent.click(togglePasswordIcon);
        expect(passwordInput).toHaveAttribute("type", "password");

    });


    test("Login Successfully", async () => {

        const emailVal = "test@example.com";
        const passwordVal = "password123";
        const auth = getAuth();

        render(<MemoryRouter>
            <Login />
        </MemoryRouter>);

        fireEvent.change(screen.getByLabelText("Email"), { target: { value: emailVal } });
        fireEvent.change(screen.getByLabelText("Password"), { target: { value: passwordVal } });

        fireEvent.click(screen.getByRole("button", { name: "Log In" }));

        await waitFor(() => {
            expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, emailVal, passwordVal)
        })

    });


})