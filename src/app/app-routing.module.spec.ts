import { routes } from "./app-routing.module"
import { LoginComponent } from "./components/login/login.component"

describe('Routing module routes', () => {
    it('Debe existir la ruta home', () => {
        expect(routes).toContain({path: 'login', component: LoginComponent})
    })
})