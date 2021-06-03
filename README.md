# Laradump (Free alternative of Spatie ray)
## Setup

You need to install thejenos/laradump in to your laravel project

```bash
composer require thejenos/laradump
```

After that start your laradump server whenever you need to see your dumps (This will only active on laravel projects)

![laradump](https://i.ibb.co/p0f6dBh/image.png)

## If you need to alter default configs

```bash
php artisan vendor:publish --provider="thejenos\laradump" --tag=config
```

## Features

```php
// Dump a variable
laradump()->dump("test");

// Dump multiple variables
laradump()->dump("test", [1,2,3], User::find(1));

// Dump models
laradump()->model(User::find(1));

// Start dump queries
laradump()->showQueries();

// Stop dump queries
laradump()->stopShowingQueries();

// Dump mails
laradump()->mail(new TestMail());

//Many more up to come
```

## Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension.

## Release Notes

Users appreciate release notes as you update your extension.

## [0.0.3]

- Add Laravel detection

## [0.0.1]

- Initial release

