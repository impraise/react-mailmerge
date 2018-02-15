# React-MailMerge

[![Build Status](https://travis-ci.org/impraise/react-mailmerge.svg?branch=master)](https://travis-ci.org/impraise/react-mailmerge)

Rendering templates is slow. If your website sends transactional email,
it's probably rendering a lot of templates, since every email uses at least
one template.

Rather than making your backend servers render all those templates,
React-MailMerge allows you to offload that work to AWS. React-MailMerge runs on
[AWS Lambda](https://aws.amazon.com/lambda/), and exposes an API for each
email template. Your backend servers can call these APIs with batches of
user data, and React-MailMerge will render the templates on Lambda
and pass the rendered versions to your mail delivery system.

# AWS Lambda

This project is designed to be deployed onto
[AWS Lambda](https://aws.amazon.com/lambda) using the
[Apex](http://apex.run) framework.

## AWS profile and credentials

To deploy templates you will need an AWS account with access to
lambda functions. The Apex documentation details the [minimum required
IAM policy](http://apex.run/#aws-credentials) for this account.

You should store your AWS credentials in the `~/.aws/credentials` file,
like this:

```
[mailmerge]
aws_access_key_id = xxxxxxxx
aws_secret_access_key = xxxxxxxxxxxxxxxxxxxxxxxx
```

# Project Structure

- `/functions` — Email templates. One template per function.
- `/shared` — Code that is shared between templates.
- `/utils` — Utility functions.
