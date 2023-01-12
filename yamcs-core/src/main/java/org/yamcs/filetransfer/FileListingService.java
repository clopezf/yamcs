package org.yamcs.filetransfer;

import org.yamcs.protobuf.ListFilesResponse;

import java.util.Set;

public interface FileListingService {

    void registerRemoteFileListMonitor(RemoteFileListMonitor monitor);

    void unregisterRemoteFileListMonitor(RemoteFileListMonitor monitor);

    void notifyRemoteFileListMonitors(ListFilesResponse listFilesResponse);

    Set<RemoteFileListMonitor> getRemoteFileListMonitors();

    /**
     * Return latest file list of the given destination.
     *
     * @param source source requesting the file list (e.g. local entity for CFDP)
     * @param destination destination from which the file list is needed (e.g. remote entity for CFDP)
     * @param remotePath path on the destination from which to get the file list
     * @param reliable reliability of the file listing request (e.g. transmission mode for CFDP, may not be needed)
     * @return file list
     */
    // TODO: maybe move "reliable" into a map
    ListFilesResponse getFileList(String source, String destination, String remotePath, boolean reliable);

    /**
     * Start fetching a new file list from remote.
     *
     * @param source source requesting the (e.g. local entity for CFDP)
     * @param destination destination from which the file list is needed (e.g. remote entity for CFDP)
     * @param remotePath path on the destination from which to get the file list
     * @param reliable reliability of the file listing request (e.g. transmission mode for CFDP, may not be needed)
     */
    void requestFileList(String source, String destination, String remotePath, boolean reliable);

    void saveFileList(ListFilesResponse listFilesResponse);
}
