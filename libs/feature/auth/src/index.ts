export * from './lib/feature-auth.module';
export { SignupComponent } from './lib/components/signup/signup.component';
export { LoginComponent } from './lib/components/login/login.component';
export { AuthGuardGuard } from './lib/guards/auth-guard.guard';
export { UnapprovedUserComponent } from './lib/components/unapproved-user/unapproved-user.component';
export { matchingPasswords } from './lib/services/auth-form.service';
export { RoleGuard } from './lib/guards/role.guard'
export { AdminGuard } from './lib/guards/admin.guard'
