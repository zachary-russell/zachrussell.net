---
title: 'Restrict Firebase Auth Login Domains'
seo_title: Restrict Firebase Google Auth Login Domains | Firebase Security - Zach Russell
slug: firebase-auth-restrict-login-by-domain 
description: 'Learn how to restrict logins with Firebase Auth and Google Sign In to specfic domain names.' 
date: 2021-06-15
categories:
- Google Cloud
resources:
- src: laptop.jpg
  name: header
header_image: "laptop.jpg"
---

## A Bit of Background...

It is a common use case for me that I work on projects for clients where i'm building tools that are meant to be used internally by their business's employees. Think of tools like an intranet or a CRM. In this case we would like any employee of the company to be able to log in. Its also common for users to have a _default_ level of access. This process should also be self-serve so employees can create their own account without having an approval process.

Luckily, Firebase has some mechanisms that help make this simple. While this feature is not built-in to Firebase, it does provide tools via their authenication SDKs and security rules to make this work without too much hassle.

## What is Firebase Auth

Firebase Auth is a part of Google's Firebase suite of products that handles logging in.

- Email & Password Login
- Google Sign-in
- Facebook Sign-in
- Twitter Sign-in
- GitHub Sign-in
- Phone Number Authentication
- Anonomous Sign-in

## Why would I use Firebase Auth

There are a lot of reasons why someone would:

1. A unified API for multiple authentication providers
2. It's completely Free
3. It's secure
4. It is HIPAA Complian (via Google's Identity Platform)

## Step 1: Server-side restrictions

The way that we restrict login access to specific domains is through [Firebase's Security Rules](https://firebase.google.com/docs/rules).

The first thing we need to do is create a function to validate an account:

```
{{< highlight javascript>}}
function validAccount(userEmail){
	return userEmail.split('@')[1] == 'mydomain.com';
}
{{< /highlight >}}
```

This function will split an email on the `@` sign and then we check if the second item in that array is equal to your authorized domain. This will return `true` or `false`.

Next, we'll set up security rules:

```
{{< highlight javascript>}}
match /Employees {
	match /{userId} {
		// allow user to read from Employees collection
		// if logged in and is an authorized account
		allow read: if request.auth != null
			&& validAccount(request.auth.token.email);
		// Avoid editing another person's profile
		allow write: if request.auth.uid == userId
			&& validAccount(request.auth.token.email);
	}
}
{{< /highlight >}}
```

This will ensure that only users from the authorized domain can read from the collection and _only_ the user can edit their own profile. More on this next.

## Step 2: Client-side

Now we have to test & enforce these rules client site. In this example we're going to use the Web SDK (JavaScript), but this mechanism exists in all of Firebase Auth's client libraries.

```
{{< highlight JavaScript>}}

function googleLogin() {
	const provider = new firebase.auth.GoogleAuthProvider();
	provider.setCustomParameters({
		hd: 'mydomain.com'
	});

	firebase.auth()
	.signInWithPopup(provider)
	.then(() => validateAccountCheck => {
		if(validAccount) {
			// do something here like update the page
		} else {
			//sign user out if not valid
			firebase.auth().signOut()
		}
	})
}
function validateAccountCheck() {
	const user = firebase.auth.currentUser;
	let profileInfo = {
		displayName: user.displayName,
		email: user.email,
		photoURL: user.photoURL
	};

	return db
		.collection('Employees')
		.doc(user.id)
		.set(profileInfo, { merge: true })
		.then(() => true)
		.catch(err => {
			// not an authorized user
			console.log(err)
			false;
		})
}

{{< /highlight >}}
```

Here is a breakdown of what is going on. First a few definitions:

- `googleLogin` is the method that gets called when a user clicks the "sign in with Google" button
- `provider.setCustomParameters` pre fills the login form with the login domain.
- `signInWithPopup` launches the Google sign in dialog in a new window. After signing in it calls the `validateAccountCheck` function. If it succeeds do something, else log out.
- `validateAccountCheck` gets the current (signed in) user and sets the user's name, email, and photo from their Google account to their record in the Employees collection.

As a result of the security rules set above a user is only allowed to write to a record in the `Employees` collection if the `userId` of the user and the `uid` of the record match.
