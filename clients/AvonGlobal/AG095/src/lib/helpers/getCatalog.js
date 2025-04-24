const getCatalog = async () => {
  // eslint-disable-next-line no-undef
  const { campaign, mrktCd, rep_id } = PDP_MANAGER.API_DATA;
  const BASE_URL = 'we.avon.digital-catalogue.com';
  const res = await fetch(`https://api.${BASE_URL}/v2/get-user-id?rep_id=${rep_id}&mrktCd=${mrktCd}`);
  const resJson = await res.json();

  const catalogRes = await fetch(
    `https://admin.${BASE_URL}/api/campaigns/${campaign}/brochures/?rep_id=${rep_id}&rep_slug=${resJson.slug}`
  );

  const catalogData = await catalogRes.json();

  return {
    repName: resJson.config['shop_with_my_rep'].name,
    catalogData,
  };
};

export default getCatalog;
