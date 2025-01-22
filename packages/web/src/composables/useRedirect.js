import { serializeParams } from "@/utils/helpers";
import { useRoute } from "vue-router";

export function useRedirect() {
  const route = useRoute();

  const redirect = decodeURIComponent(route.query?.redirect || "/");
  const urlEncodedEmail = decodeURIComponent(route.query?.email || "");

  function goTo(baseUrl, params) {
    return `${baseUrl}?${serializeParams(params)}`;
  }

  return {
    redirect,
    urlEncodedEmail,
    goTo,
  };
}
