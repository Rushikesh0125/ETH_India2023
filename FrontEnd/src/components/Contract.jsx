// cc: https://github.com/Rushikesh0125/snb-sdk/commit/196785fc32f3db65ccdb6c719fba80505121a1a8

import { useQuery } from "@tanstack/react-query";
import { createClient } from "urql";



const userAddress = "0x9d97cf3ac20b73c81d8a5233d9fbe09618d4f8bd";
const goerli_query_url =
  "https://api.studio.thegraph.com/query/51610/deployer-eth-goerli/version/latest";
const bsc_query_url =
  "https://api.studio.thegraph.com/query/51610/deployer-bsc/version/latest";
const mumbai_query_url =
  "https://api.studio.thegraph.com/query/51610/deployer-mumbai/version/latest";

const query = `{
  deployeds {
    deployedAddress
    sender
  }
}`;

const goerli_client = createClient({
  url: goerli_query_url,
});

const bsc_client = createClient({
  url: bsc_query_url,
});

const mumbai_client = createClient({
  url: mumbai_query_url,
});


const Contract = () => {
 

  const goerli = useQuery({
    queryKey: ["goerli"],
    queryFn: () => goerli_client.query(query).toPromise(),
    enabled: !!goerli_client,
    select: (data) => {
      return {
        data: data.data.deployeds
          .filter((d) => d.sender === userAddress)
          .map((d) => {
            return {
              contractAddress: d.deployedAddress,
              chain: "goerli",
            };
          }),
      };
    },
  });

  const mumbai = useQuery({
    queryKey: ["mumbai"],
    queryFn: () => mumbai_client.query(query).toPromise(),
    enabled: !!mumbai_client,
    select: (data) => {
      return {
        data: data.data.deployeds
          .filter((d) => d.sender === userAddress)
          .map((d) => {
            return {
              contractAddress: d.deployedAddress,
              chain: "mumbai",
            };
          }),
      };
    },
  });

  const bsc = useQuery({
    queryKey: ["bsc"],
    queryFn: () => bsc_client.query(query).toPromise(),
    enabled: !!bsc_client,
    select: (data) => {
      return {
        data: data.data.deployeds
          .filter((d) => d.sender === userAddress)
          .map((d) => {
            return {
              contractAddress: d.deployedAddress,
              chain: "bsc",
            };
          }),
      };
    },
  });

  const isLoading = goerli.isLoading || bsc.isLoading || mumbai.isLoading;
  const isError = goerli.isError || bsc.isError || mumbai.isError;
  const allData =
    goerli?.data?.data && mumbai?.data?.data && bsc?.data?.data
      ? [...goerli.data.data, ...bsc.data.data, ...mumbai.data.data]
      : [];

  return (
    <main className="bg-green-400 h-screen">
      <div className="m-20 overflow-hidden">
        <table className="w-full max-h-screen overflow-y-scroll bg-green-400 text-sm text-left rtl:text-right text-gray-500 ">
          <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white  ">
            Contracts deployed by the user
          </caption>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Contract Address
              </th>
              <th scope="col" className="px-6 py-3">
                Chain
              </th>
            </tr>
          </thead>
          <tbody className="overflow-y-scroll max-h-screen">
            {isLoading ? (
              <h3>Loading</h3>
            ) : isError ? (
              <h3>Error</h3>
            ) : (
              allData.map((el, i) => (
                <tr key={i} className="bg-white border-b ">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                  >
                    {el.contractAddress}
                  </th>
                  <td className="px-6 py-4">{el.chain}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default Contract;

 
