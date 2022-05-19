import { json } from "@remix-run/cloudflare";
import type {
  LoaderFunction,
  DataFunctionArgs,
  ActionFunction,
} from "@remix-run/cloudflare";
import { Form, useActionData, useLoaderData } from "@remix-run/react";

export const loader: LoaderFunction = async ({
  request,
  context,
}: DataFunctionArgs) => {
  const url = new URL(request.url);

  const counter = context.COUNTER as DurableObjectNamespace;
  const id = counter.idFromName("A");
  const obj = counter.get(id);
  const resp = await obj.fetch(`${url.origin}/current`);
  const count = await resp.text();

  return json(count);
};

export const action: ActionFunction = async ({
  request,
  context,
}: DataFunctionArgs) => {
  const url = new URL(request.url);

  const counter = context.COUNTER as DurableObjectNamespace;
  const id = counter.idFromName("A");
  const obj = counter.get(id);
  const resp = await obj.fetch(`${url.origin}/increment`);
  const count = await resp.text();

  return count;
};

export default function Index() {
  let count = useLoaderData();
  const actionData = useActionData();

  return (
    <div>
      <h1>Welcome to Remix</h1>
      <div>Counter: {JSON.stringify(count)}</div>
      {actionData && <h1>action result: {actionData}</h1>}

      <Form method="post">
        <button type="submit">increment</button>
      </Form>
    </div>
  );
}
